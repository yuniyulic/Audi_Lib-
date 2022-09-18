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

import Audi_Lib.board.service.BoardService;
import Audi_Lib.board.vo.BoardNoticeInfoVO;
import Audi_Lib.board.vo.BoardVO;
import Audi_Lib.member.vo.MemberVO;
import Audi_Lib.qna.service.QnaService;
import Audi_Lib.qna.vo.QnaVO;

import org.springframework.web.servlet.ModelAndView;
@RequestMapping("/qna")
@Controller
public class QnaController {

	//참여마당 - QnA
	@RequestMapping("/qna.do")
	public ModelAndView qna(@RequestParam HashMap<Object, Object> params, ModelAndView mv) {
		mv.setViewName("qna/qna");
		return mv;
	}
	
	@Resource(name = "qnaService")
	QnaService qnaService;
	
	
	
}
