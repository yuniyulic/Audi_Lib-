package Audi_Lib.qna.service;

import java.util.List;

import Audi_Lib.home.vo.PagingVO;
import Audi_Lib.qna.vo.QnaVO;

public interface QnaService {
	
	//QnA 개수 카운트
	int countQna();
	
	//QnA 목록 조회
	List<QnaVO> selectQnaList(PagingVO pagingVO);

	//QnA 작성
	int insertQna(QnaVO qnaVO);
	
	//QnA 상세 조회
	QnaVO detailQna(QnaVO qnaVO);
}
