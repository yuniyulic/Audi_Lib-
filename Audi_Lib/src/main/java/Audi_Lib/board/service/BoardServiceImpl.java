package Audi_Lib.board.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Audi_Lib.board.vo.BoardNoticeInfoVO;
import Audi_Lib.board.vo.BoardVO;
import Audi_Lib.home.vo.PagingVO;

@Service("boardService")
public class BoardServiceImpl implements BoardService{

	@Autowired
	private SqlSessionTemplate sqlSession;

	//게시글 개수 카운트
	@Override
	public int countBoard() {
		return sqlSession.selectOne("countBoardInfo");
	}

	//게시글 목록 조회
	@Override
	public List<BoardVO> selectBoardList(PagingVO pagingVO) {
		return sqlSession.selectList("selectBoardList", pagingVO);
	}

	//게시글 상세 조회
	@Override
	public BoardVO detailBoard(BoardVO boardVO) {
		sqlSession.update("updateCount", boardVO);
		return sqlSession.selectOne("detailBoard", boardVO);
	}

	//게시글 작성
	@Override
	public int insertBoard(BoardVO boardVO) {
		return sqlSession.insert("insertBoard", boardVO);
	}

	//게시글 삭제
	@Override
	public int deleteBoard(BoardVO boardVO) {
		return sqlSession.delete("deleteBoard", boardVO);
	}

	//게시글 수정
	@Override
	public int updateBoard(BoardVO boardVO) {
		return sqlSession.update("updateBoard", boardVO);
	}

	//공지사항 수정
	@Override
	public int updateBoardNotice(BoardNoticeInfoVO boardNoticeInfoVO) {
		sqlSession.delete("deleteBoard", boardNoticeInfoVO);
		return sqlSession.update("updateBoardNotice", boardNoticeInfoVO);
	}

	//공지사항 목록 조회
	@Override
	public List<BoardNoticeInfoVO> selectBoardNoticeInfo() {
		return sqlSession.selectList("selectBoardNoticeInfo");
	}

	//공지사항 상세 조회
	@Override
	public BoardNoticeInfoVO detailBoardNotice(BoardVO boardVO) {
		sqlSession.update("updateCountNotice", boardVO);
		return sqlSession.selectOne("detailBoardNotice", boardVO);
	}

	//공지사항 삭제
	@Override
	public int deleteBoardNotice(BoardVO boardVO) {
		return sqlSession.delete("deleteBoardNotice", boardVO);
	}

}
