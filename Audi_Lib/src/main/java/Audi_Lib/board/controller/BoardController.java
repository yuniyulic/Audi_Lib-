package Audi_Lib.board.controller;

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
import org.springframework.web.servlet.ModelAndView;
@RequestMapping("/board")
@Controller
public class BoardController {

	//참여마당
	@RequestMapping("/board.do")
	public ModelAndView board(@RequestParam HashMap<Object, Object> params, ModelAndView mv) {
		mv.setViewName("board/board");
		return mv;
	}
	
	
	@Resource(name = "boardService")
	BoardService boardService;
	
	//寃뚯떆�뙋 �젣紐⑺겢由� �떆 �긽�꽭�궡�슜
	@GetMapping("/detailBoard")
	public String detailBoard(BoardVO boardVO, Model model) {
		model.addAttribute("board", boardService.detailBoard(boardVO));
		
		return "board/detail_board";
	}
	
	//寃뚯떆�뙋 怨듭��겢由� �떆 �긽�꽭�궡�슜
	@GetMapping("/detailBoardNotice")
	public String detailBoardNotice(BoardVO boardVO, Model model) {
		model.addAttribute("board", boardService.detailBoardNotice(boardVO));
		
		return "board/detail_notice_board";
	}
	
	//怨듭��궗�빆 �벑濡�/�빐�젣
	@PostMapping("/updateBoardNotice")
	@ResponseBody
	public int updateBoardNotice(BoardNoticeInfoVO boardNoticeInfoVO, HttpSession session) {
		MemberVO memberVO = (MemberVO)session.getAttribute("loginInfo");
		boardNoticeInfoVO.setRegMember(memberVO.getMemberCode());
		return boardService.updateBoardNotice(boardNoticeInfoVO);
	}
	
	//湲��벐湲고솕硫댁쑝濡� �씠�룞
	@GetMapping("/writeBoard")
	public String writeBoard(HttpSession session) {
		if(session.getAttribute("loginInfo") == null) {
			return "member/alert_u_need_login";
		}
		
		return "board/write_board";
	}
	
	//湲��벖嫄� insert
	@PostMapping("/insertBoard")
	public String insertBoard(BoardVO boardVO, HttpSession session) {
		MemberVO membervo = (MemberVO) session.getAttribute("loginInfo");
		
		boardVO.setRegMember(membervo.getMemberCode());
		boardService.insertBoard(boardVO);
		
		return "redirect:/home/board";
	}
	
	//湲��벖嫄� �궘�젣
	@GetMapping("/deleteBoard")
	public String deleteBoard(BoardVO boardVO) {
		int result = boardService.deleteBoard(boardVO);
		if(result == 1) {
			return "alert/success_delete";
		}
		return "redirect:/home/board";
	}
	
	//怨듭��궗�빆 �궘�젣
	@GetMapping("/deleteBoardNotice")
	public String deleteBoardNotice(BoardVO boardVO) {
		int result = boardService.deleteBoardNotice(boardVO);
		if(result == 1) {
			return "alert/success_delete";
		}
		return "redirect:/home/board";
	}
	
	
	@GetMapping("/BoardBeforeupdateBoard")
	public String BoardBeforeupdateBoard(BoardVO boardVO, Model model) {
		model.addAttribute("boardVO", boardService.detailBoard(boardVO));
		
		return "board/update_board";
	}
	
	@PostMapping("/updateBoard")
	public String updateBoard(BoardVO boardVO) {
		int result = boardService.updateBoard(boardVO);
		if(result == 1) {
			return "alert/success_update";
		}
		
		return "redirect:/home/board";
	}
	
	
	
	
}
