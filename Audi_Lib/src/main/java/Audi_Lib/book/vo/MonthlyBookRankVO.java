package Audi_Lib.book.vo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class MonthlyBookRankVO {
	private String rankMonth;
	private String rank1;
	private String rank2;
	private String rank3;
	private String rank4;
	private String rank5;
	private String rank6;
	private String rank7;
	private String rank8;
	private String rank9;
	
	//랭킹 출력을 위한 List변수 추가
	private List<String> thisMonthRankedBookList;
	
	public List<String> getThisMonthRankedBookList() {
		return thisMonthRankedBookList;
	}
	public void setThisMonthRankedBookList(List<String> thisMonthRankedBookList) {
		this.thisMonthRankedBookList = thisMonthRankedBookList;
	}
	//--------------------------------------------------
	public String getRankMonth() {
		return rankMonth;
	}
	public void setRankMonth(String rankMonth) {
		this.rankMonth = rankMonth;
	}
	public String getRank1() {
		return rank1;
	}
	public void setRank1(String rank1) {
		this.rank1 = rank1;
	}
	public String getRank2() {
		return rank2;
	}
	public void setRank2(String rank2) {
		this.rank2 = rank2;
	}
	public String getRank3() {
		return rank3;
	}
	public void setRank3(String rank3) {
		this.rank3 = rank3;
	}
	public String getRank4() {
		return rank4;
	}
	public void setRank4(String rank4) {
		this.rank4 = rank4;
	}
	public String getRank5() {
		return rank5;
	}
	public void setRank5(String rank5) {
		this.rank5 = rank5;
	}
	public String getRank6() {
		return rank6;
	}
	public void setRank6(String rank6) {
		this.rank6 = rank6;
	}
	public String getRank7() {
		return rank7;
	}
	public void setRank7(String rank7) {
		this.rank7 = rank7;
	}
	public String getRank8() {
		return rank8;
	}
	public void setRank8(String rank8) {
		this.rank8 = rank8;
	}
	public String getRank9() {
		return rank9;
	}
	public void setRank9(String rank9) {
		this.rank9 = rank9;
	}
	
	public void setMonthlyRank(List<String> rankedBookList) {
		HashMap<Integer, String> tempForRank = new HashMap<>();
		for(int i = 0 ; i < rankedBookList.size() ; i++) {
			tempForRank.put(i, rankedBookList.get(i));
		}
		if(rankedBookList.size() < 9) {
			for(int i = rankedBookList.size() ; i < 9 ; i++) {
				tempForRank.put(i, "");
			}
		}
		setRank1(tempForRank.get(0));
		setRank2(tempForRank.get(1));
		setRank3(tempForRank.get(2));
		setRank4(tempForRank.get(3));
		setRank5(tempForRank.get(4));
		setRank6(tempForRank.get(5));
		setRank7(tempForRank.get(6));
		setRank8(tempForRank.get(7));
		setRank9(tempForRank.get(8));
	}
	
	public void setList(){
		List<String> list = new ArrayList<>();
		list.add(this.rank1 == null ? "" : this.rank1);
		list.add(this.rank2 == null ? "" : this.rank2);
		list.add(this.rank3 == null ? "" : this.rank3);
		list.add(this.rank4 == null ? "" : this.rank4);
		list.add(this.rank5 == null ? "" : this.rank5);
		list.add(this.rank6 == null ? "" : this.rank6);
		list.add(this.rank7 == null ? "" : this.rank7);
		list.add(this.rank8 == null ? "" : this.rank8);
		list.add(this.rank9 == null ? "" : this.rank9);
		
		setThisMonthRankedBookList(list);
	}
	
}
