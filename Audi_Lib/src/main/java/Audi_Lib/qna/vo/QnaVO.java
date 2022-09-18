package Audi_Lib.qna.vo;

public class QnaVO {
	private String qnaCode;
	private String qnaTitle;
	private String qnaContent;
	private String regMember;
	private String regDate;
	private int isSecurity;
	private int isNotice;
	private String fileName;
	private int readCnt;
	private int rn;
	private String memberName;
	private String searchName;
	private String isAdmin;
	
	public String getQnaCode() {
		return qnaCode;
	}
	public void setQnaCode(String qnaCode) {
		this.qnaCode = qnaCode;
	}
	public String getQnaTitle() {
		return qnaTitle;
	}
	public void setQnaTitle(String qnaTitle) {
		this.qnaTitle = qnaTitle;
	}
	public String getQnaContent() {
		return qnaContent;
	}
	public void setQnaContent(String qnaContent) {
		this.qnaContent = qnaContent;
	}
	public String getRegMember() {
		return regMember;
	}
	public void setRegMember(String regMember) {
		this.regMember = regMember;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public int getIsSecurity() {
		return isSecurity;
	}
	public void setIsSecurity(int isSecurity) {
		this.isSecurity = isSecurity;
	}
	public int getIsNotice() {
		return isNotice;
	}
	public void setIsNotice(int isNotice) {
		this.isNotice = isNotice;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public int getReadCnt() {
		return readCnt;
	}
	public void setReadCnt(int readCnt) {
		this.readCnt = readCnt;
	}
	public int getRn() {
		return rn;
	}
	public void setRn(int rn) {
		this.rn = rn;
	}
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public String getSearchName() {
		return searchName;
	}
	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}
	public String getIsAdmin() {
		return isAdmin;
	}
	public void setIsAdmin(String isAdmin) {
		this.isAdmin = isAdmin;
	}
	
	public QnaVO(String qnaCode, String qnaTitle, String qnaContent, String regMember, String regDate, int isSecurity,
			int isNotice, String fileName, int readCnt, int rn, String memberName, String searchName, String isAdmin) {
		super();
		this.qnaCode = qnaCode;
		this.qnaTitle = qnaTitle;
		this.qnaContent = qnaContent;
		this.regMember = regMember;
		this.regDate = regDate;
		this.isSecurity = isSecurity;
		this.isNotice = isNotice;
		this.fileName = fileName;
		this.readCnt = readCnt;
		this.rn = rn;
		this.memberName = memberName;
		this.searchName = searchName;
		this.isAdmin = isAdmin;
	}
	
	@Override
	public String toString() {
		return "QnaVO [qnaCode=" + qnaCode + ", qnaTitle=" + qnaTitle + ", qnaContent=" + qnaContent + ", regMember="
				+ regMember + ", regDate=" + regDate + ", isSecurity=" + isSecurity + ", isNotice=" + isNotice
				+ ", fileName=" + fileName + ", readCnt=" + readCnt + ", rn=" + rn + ", memberName=" + memberName
				+ ", searchName=" + searchName + ", isAdmin=" + isAdmin + "]";
	}
	
}
