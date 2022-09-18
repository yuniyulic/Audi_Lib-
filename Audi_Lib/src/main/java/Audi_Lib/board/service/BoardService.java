package Audi_Lib.board.service;

import java.util.List;

import Audi_Lib.board.vo.BoardNoticeInfoVO;
import Audi_Lib.board.vo.BoardVO;
import Audi_Lib.home.vo.PagingVO;

public interface BoardService {

	//게시글 개수 카운트
	int countBoard();

	//게시글 목록 조회
	List<BoardVO> selectBoardList(PagingVO pagingVO);

	//게시글 상세 조회
	BoardVO detailBoard(BoardVO boardVO);

	//게시글 작성
	int insertBoard(BoardVO boardVO);

	//게시글 삭제
	int deleteBoard(BoardVO boardVO);

	//게시글 수정
	int updateBoard(BoardVO boardVO);

	//공지사항 수정
	int updateBoardNotice(BoardNoticeInfoVO boardNoticeInfoVO);

	//공지사항 목록 조회
	List<BoardNoticeInfoVO> selectBoardNoticeInfo();

	//공지사항 상세 조회
	BoardNoticeInfoVO detailBoardNotice(BoardVO boardVO);

	//공지사항 삭제
	int deleteBoardNotice(BoardVO boardVO);


}
