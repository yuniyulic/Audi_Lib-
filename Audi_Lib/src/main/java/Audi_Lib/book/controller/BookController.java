package Audi_Lib.book.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.support.RequestContextUtils;

import Audi_Lib.book.service.BookService;
import Audi_Lib.book.vo.BookClassVO;
import Audi_Lib.book.vo.BookVO;
import Audi_Lib.book.vo.BookViewVO;
import Audi_Lib.book.vo.MonthlyBookRankVO;
import Audi_Lib.home.vo.PagingVO;
import Audi_Lib.util.DateUtil;
import Audi_Lib.util.FileUploadUtil;

@Controller
@RequestMapping("/book")
public class BookController {
	@Resource(name = "bookService")
	private BookService bookService;
	
	//책 통합검색
	@RequestMapping("/bookList")
	public String bookList(BookViewVO bookViewVO, PagingVO pagingVO, Model model, HttpServletRequest request) {
		BookViewVO bookViewVOTemp = null;
		PagingVO pagingVOTemp = null;
		Map<String, ?> flashMap = RequestContextUtils.getInputFlashMap(request);
		if(flashMap != null) {
			@SuppressWarnings("unchecked")
			Map<String, Object> redirectMap = (Map<String, Object>)flashMap.get("redirectMap");
			BookViewVO rdaBookViewVO = (BookViewVO)redirectMap.get("rdaBookViewVO");
			PagingVO rdapagingVO = (PagingVO)redirectMap.get("rdaPagingVO");
			if(rdaBookViewVO != null) {
				bookViewVO = rdaBookViewVO;
			}
			if(rdapagingVO != null) {
				pagingVO = rdapagingVO;
			}
		}
		
		//페이징 처리
		int total = bookService.countBookForPaging(bookViewVO);
		if (pagingVO.getNowPage() == 0) {
			pagingVO.setNowPage(1);
		}
		if (pagingVO.getCntPerPage() == 0) {
			pagingVO.setCntPerPage(10);
		}
		pagingVO.setPagingVO(total);
		
		bookViewVO.setStart(pagingVO.getStart());
		bookViewVO.setEnd(pagingVO.getEnd());
		
		bookViewVOTemp = bookViewVO;
		pagingVOTemp =  pagingVO;
		
		model.addAttribute("bookClassList", bookService.selectBookClassAll());
		model.addAttribute("bookList", bookService.selectBookList(bookViewVO));
		model.addAttribute("bookViewVOTemp", bookViewVOTemp);
		model.addAttribute("pagingVOTemp", pagingVOTemp);
		
		return "book/book_list";
	}
	//책 카테고리별
	@GetMapping("/listToCategory")
	public String listToCategory(Model model) {
		List<List<BookViewVO>> bookListToCategory = new ArrayList<>();
		for(BookClassVO e : bookService.selectClassListToCount()) {
			bookListToCategory.add(bookService.selectBookListToClass(e));
		}
		model.addAttribute("bookListToCategory", bookListToCategory);
		return "book/book_list_category";
	}
	
	//신착도서
	@RequestMapping("/listToNewCommer")
	public String listToNewCommer(Model model) {
		model.addAttribute("newCommerList", bookService.selectBookListToTime());
		return "book/book_list_new";
	}
	//월간랭킹별
	@GetMapping("/listToRank")
	public String listToRank(@RequestParam(name = "rankMonth", required = false) String rankMonth, Model model) {
		//월간 랭킹 테이블 전체를 조회함(selectbox에 사용할 것)
		model.addAttribute("rankedMonthList", bookService.selectRankedMonth());
		
		//만약 rankMonth를 입력 받지 못했다면, 기본으로 현재달 - 1을 넣어 줌.
		if(rankMonth == null) {
			rankMonth = DateUtil.getLastMonthToString();
		}
		
		//selected 속성을 넣기위해 rankMonth를 다시 돌려준다
		model.addAttribute("selectedMonth", rankMonth);
		
		//rankMonth로 선택된 달의 전월/ 전전월의 정보를 List로 만들어 줌
		List<String> selectedRankMonthList = setRankMonthList(rankMonth);
		
		//label에 사용하기 위해 이 정보도 넘겨줌 
		model.addAttribute("selectedRankMonthList", selectedRankMonthList);

		//책목록을 담은 목록을 만들기 위한 List를 선언
		List<List<BookViewVO>> monthlyRank = new ArrayList<>();
		
		
		for(String e : selectedRankMonthList){
			//List에 들어간 rankMonth 별로 월간 랭킹 테이블에서 정보를 받아옴
			MonthlyBookRankVO monthlyBookRankVO = bookService.selectRankedBookVOToMonth(e);
			
			//해당 rankMonth의 정보가 월간 랭킹 테이블에 있으면
			if(monthlyBookRankVO != null) {
				//1~9등의 BOOK_CODE 정보를 List로 만듦, mapper에 필요한 내부 List세팅
				monthlyBookRankVO.setList();
				
				//1~9등의 BOOK_CODE 정보가 담긴 List를 바탕으로 해당 순서에 맞춰서 책 정보 리스트를 받아 옴
				List<BookViewVO> thisMonthRankedBookList = bookService.selectThisMonthRankedBookInfoList(monthlyBookRankVO);
				
				//책 정보 리스트를 리스트에 다시 담음
				monthlyRank.add(thisMonthRankedBookList);
			}
		}
		//책 정보 리스트가 담긴 리스트를 jsp로 보내줌
		model.addAttribute("monthlyRank", monthlyRank);
		return "book/book_list_rank";
	}
	//책 자세히 보기
	@RequestMapping("/bookDetail")
	public String bookDetail(BookViewVO bookViewVO, Model model, HttpServletRequest request) {
		Map<String, ?> flashMap = RequestContextUtils.getInputFlashMap(request);
		if(flashMap != null) {
			@SuppressWarnings("unchecked")
			Map<String, Object> redirectMap = (Map<String, Object>)flashMap.get("redirectMap");
			BookViewVO rdaBookViewVO = (BookViewVO)redirectMap.get("rdaBookViewVO");
			if(rdaBookViewVO != null) {
				bookViewVO = rdaBookViewVO;
			}
		}
		//넘어온 bookCode에 해당하는 책의 자세한 정보를 넘겨 줌
		model.addAttribute("bookViewVO", bookService.selectBookDetail(bookViewVO));
		return "book/book_detail";
	}

	
	
	//rankMonth를 받아와서 전월/ 전전월의 정보를 List로 만들어줌
	//EX) '2021-04'를 받아와서 ['2021-04' , '2021-03' , '2021-02']의 리스트로 만들어 줌
	private List<String> setRankMonthList(String rankMonth) {//rankMonth => 'yyyy-MM'의 형식으로 들어옴
		List<String> rankMonthList = new ArrayList<>();
		rankMonthList.add(rankMonth); //선택한 월
		rankMonth = processRankMonth(rankMonth); //선택한 월 - 1
		rankMonthList.add(rankMonth);
		rankMonth = processRankMonth(rankMonth);
		rankMonthList.add(rankMonth);
		
		return rankMonthList;
	}
	
	//입력 받은 rankMonth를 - 1월을 한 정보로 만듦
	//EX) '2021-04'를 받아와서 '2021-03'으로 만듦, '2021-01'을 받아와서 '2020-12'로 만듦
	private String processRankMonth(String rankMonth) {//rankMonth => 'yyyy-MM'
		String rYear = rankMonth.substring(0, 4);
		String rMonth = rankMonth.substring(5);
		
		if((Integer.parseInt(rMonth) - 1) == 0) {
			rYear = (Integer.parseInt(rYear) + 1) + "";
			rMonth = "12";
		}
		else {
			rMonth = String.format("%02d", (Integer.parseInt(rMonth) - 1));
		}
		return rYear + "-" + rMonth;
	}
}

