package Audi_Lib.qna.service;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Audi_Lib.home.vo.PagingVO;
import Audi_Lib.qna.vo.QnaVO;


@Service("qnaService")
public class QnaServiceImpl implements QnaService{

	@Autowired
	private SqlSessionTemplate sqlSession;

	//QnA 개수 카운트
	@Override
	public int countQna() {
		return sqlSession.selectOne("countQnaInfo");
	}

	//QnA 목록 조회
	@Override
	public List<QnaVO> selectQnaList(PagingVO pagingVO) {
		return sqlSession.selectList("selectQnaList", pagingVO);
	}
	
	
}
