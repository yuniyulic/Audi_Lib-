package Audi_Lib.bookRent.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import Audi_Lib.book.vo.BookVO;
import Audi_Lib.book.vo.BookViewVO;
import Audi_Lib.bookRent.service.BookRentService;
import Audi_Lib.bookRent.vo.BookRentVO;
import Audi_Lib.home.vo.PagingVO;
import Audi_Lib.member.vo.MemberVO;

@Controller
@RequestMapping("/rent")
public class BookRentController {
	
	@Resource(name = "bookRentService")
	private BookRentService bookRentService;
	
	@PostMapping("/bookRentForm")
	public String bookRentForm(BookVO bookVO, BookViewVO bookViewVO, PagingVO pagingVO, @RequestParam(name = "comeFrom", required = false) String comeFrom, Model model, HttpSession session) {
		MemberVO loginInfo = (MemberVO)session.getAttribute("loginInfo");
		if(loginInfo != null) {
			model.addAttribute("memberLevelInfo", bookRentService.selectMemberLevelInfo(loginInfo));
			model.addAttribute("countRentedBook", bookRentService.countRentedBook(loginInfo));
		}
		model.addAttribute("comeFrom", comeFrom);
		model.addAttribute("levelInfoList", bookRentService.memberLevelList());
		return "book/book_rent_form";
	}
	
	@PostMapping("/bookRent")
	public String rentBook(BookRentVO bookRentVO, BookViewVO bookViewVO, PagingVO pagingVO, @RequestParam(name = "comeFrom", required = false) String comeFrom, RedirectAttributes rda) {
		bookRentService.insertRentBookProcedure(bookRentVO);
		
		if(comeFrom == null || comeFrom.equals("")) {
			return "redirect:/home/first";
		}
		else {
			String path = "";
			Map<String, Object> redirectMap = new HashMap<>();
			if(bookViewVO != null) {
				redirectMap.put("rdaBookViewVO", bookViewVO);
			}
			if(pagingVO != null) {
				redirectMap.put("rdaPagingVO", pagingVO);
			}
			if(redirectMap != null) {
				rda.addFlashAttribute("redirectMap", redirectMap);
			}
			
			if(comeFrom.equals("new")) {
				path = "/listToNewCommer";
			}
			else if(comeFrom.equals("list")) {
				path = "/bookList";
			}
			else if(comeFrom.equals("detail")) {
				path = "/bookDetail";
			}
			else {
				return "redirect:/home/first";
			}
			return "redirect:/book" + path;
		}
	}
	
	@GetMapping("/bookReturn")
	public String bookReturn(BookRentVO bookRentVO) {
		bookRentService.updateRentedBookReturn(bookRentVO);
		return "redirect:/member/rentReturnBook";
	}
}
