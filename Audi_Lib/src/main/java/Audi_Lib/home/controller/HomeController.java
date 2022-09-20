package Audi_Lib.home.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.scripting.xmltags.IfSqlNode;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import Audi_Lib.board.service.BoardService;
import Audi_Lib.board.vo.BoardNoticeInfoVO;
import Audi_Lib.book.service.BookService;
import Audi_Lib.book.vo.MonthlyBookRankVO;
import Audi_Lib.home.service.HomeService;
import Audi_Lib.home.vo.PagingVO;
import Audi_Lib.qna.service.QnaService;
import Audi_Lib.util.DateUtil;

@Controller
@RequestMapping(value = "/home")
public class HomeController {

	@Resource(name = "homeService")
	HomeService homeService;
	
	@Resource(name = "bookService")
	BookService bookService;
	
	@Resource(name = "boardService")
	private BoardService boardService;

	@Resource(name = "qnaService")
	private QnaService qnaService;
	
	//현재 index.jsp를 거쳐서 들어오는 홈페이지
	@RequestMapping("/first")
	public String goHome(Model model) {
		model.addAttribute("bookClassList", bookService.selectBookClassAll());
		List<BoardNoticeInfoVO> list = boardService.selectBoardNoticeInfo();
		//공지사항 5개 이상은 없애고 띄운다.
		if(list.size() > 5) {
			for (int j = 5; j < list.size(); j++) {
				list.remove(j);
			}
		}
		model.addAttribute("boardList", list);
		
		//지난달의 랭킹을 홈 화면에 표시---------------
		//지난달의 'yyyy-mm'을 받아옴
		String rankMonth = DateUtil.getLastMonthToString();
		//rankMonth를 바탕으로 월간랭킹 정보를 받아옴
		MonthlyBookRankVO monthlyBookRankVO = bookService.selectRankedBookVOToMonth(rankMonth);
		if(monthlyBookRankVO != null) {
			//VO내부의 List세팅
			monthlyBookRankVO.setList();
			model.addAttribute("lastMonthRank", bookService.selectThisMonthRankedBookInfoList(monthlyBookRankVO));
		}
		
		//---------------------------------------------
		return "home/home";
	}
	
	
	//memberController에 들어가면 좋을 내용
	//top_menu.jsp의 로그인 버튼을 눌러서 로그인페이지로 이동
	@GetMapping("/login")
	public String login() {
		return "member/login";
	}
	//top_menu.jsp의 회원가입 버튼을 눌러서 회원가입 페이지로 이동
	@GetMapping("/join")
	public String join() {
		return "member/join";
	}
	
	//로그아웃
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.removeAttribute("loginInfo");
		return "redirect:/home/first";
	}
	
	//이 밑으로는 임시로 만들어 놓은 메뉴 이동
	@GetMapping("/book")
	public String book() {
		return "book/book";
	}
	
	@GetMapping("/facility")
	public String facility() {
		return "facility/facility";
	}
	
	/* 참여마당 - 공지사항/자유게시판 */
	@RequestMapping("/board")
	public String board(PagingVO pagingVO, Model model
			, @RequestParam(value="nowPage", required=false)String nowPage
			, @RequestParam(value="cntPerPage", required=false)String cntPerPage) {
		int total = boardService.countBoard();
		if (nowPage == null && cntPerPage == null) {
			nowPage = "1";
			cntPerPage = "10";
		} else if (nowPage == null) {
			nowPage = "1";
		} else if (cntPerPage == null) { 
			cntPerPage = "10";
		}
		String keyword = pagingVO.getKeyword();
		pagingVO = new PagingVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
		pagingVO.setKeyword(keyword);
		model.addAttribute("paging", pagingVO);
		model.addAttribute("boardNoticeInfo", boardService.selectBoardNoticeInfo());
		model.addAttribute("boardList", boardService.selectBoardList(pagingVO));
		
		return "board/board";
	}
	
	/* @@@@@@ 기능 구현 */
	/* 참여마당 - QnA */
	@RequestMapping("/qna")
	public String qna(PagingVO pagingVO, Model model
			, @RequestParam(value="nowPage", required = false)String nowPage
			, @RequestParam(value="cntPerPage", required = false)String cntPerPage) {
			
		int total = qnaService.countQna();
		
		if (!"".equals(nowPage) && !"".equals(cntPerPage)) {
			nowPage = "1";
			cntPerPage = "10";
		} else if (!"".equals(nowPage)) {
			nowPage = "1";
		} else if (!"".equals(cntPerPage)) {
			cntPerPage = "10";
		}
		
		String keyword = pagingVO.getKeyword();
		pagingVO = new PagingVO(total, Integer.parseInt(nowPage), Integer.parseInt(cntPerPage));
		pagingVO.setKeyword(keyword);
		model.addAttribute("paging", pagingVO);
		model.addAttribute("qnaList", qnaService.selectQnaList(pagingVO));
	
		return "qna/qna";
	}
	
	//페이지 최 하단 footer의 내용
	@GetMapping("/personalInfo")
	public String personalInfo() {
		return "home/personal_info";
	}
	
	
	/* 도서관 소개 */
	@GetMapping("/helloLib")
	public String helloLib() {
		
		return "home/hello_lib";
	}
	@GetMapping("/historyLib")
	public String historyLib() {
		
		return "home/history_lib";
	}
	@GetMapping("/groupLib")
	public String groupLib() {
		
		return "home/group_lib";
	}
	@GetMapping("/floorLib")
	public String floorLib() {
		
		return "home/floor_lib";
	}
		
}
