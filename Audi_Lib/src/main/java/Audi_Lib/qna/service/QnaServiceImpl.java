package Audi_Lib.qna.service;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service("qnaService")
public class QnaServiceImpl implements QnaService{

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
}
