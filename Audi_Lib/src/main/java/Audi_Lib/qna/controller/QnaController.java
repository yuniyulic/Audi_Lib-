package Audi_Lib.qna.controller;

import java.util.HashMap;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.scripting.xmltags.IfSqlNode;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import Audi_Lib.member.vo.MemberVO;
import Audi_Lib.qna.service.QnaService;
import Audi_Lib.qna.vo.QnaVO;

import org.springframework.web.servlet.ModelAndView;
@RequestMapping("/qna")
@Controller
public class QnaController {

	@Resource(name = "qnaService")
	QnaService qnaService;

	//참여마당 - QnA
	@RequestMapping("/qna.do")
	public ModelAndView qna(@RequestParam HashMap<Object, Object> params, ModelAndView mv) {
		mv.setViewName("qna/qna");
		return mv;
	}
	
	//QnA 글쓰기 화면으로 이동
	@GetMapping("/writeQna")
	public String writeQna(HttpSession session) {
		if(session.getAttribute("loginInfo") == null) {
			return "member/alert_u_need_login";
		}
		
		return "qna/write_qna";
	}
	
	//QnA 작성
	@PostMapping("/insertQna")
	public String insertQna(QnaVO qnaVO, HttpSession session) {
		MemberVO membervo = (MemberVO) session.getAttribute("loginInfo");
		
		qnaVO.setRegMember(membervo.getMemberCode());
		qnaService.insertQna(qnaVO);
		
		return "redirect:/home/qna";
	}

	//QnA 상세 조회
	@GetMapping("/detailQna")
	public String detailQna(QnaVO qnaVO, Model model) {
		model.addAttribute("qna", qnaService.detailQna(qnaVO));
		
		return "qna/detail_qna";
	}
	
	
}
