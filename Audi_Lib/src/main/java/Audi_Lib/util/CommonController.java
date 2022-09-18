package Audi_Lib.util;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/resources")
public class CommonController{
	
	private static final String FILE_SERVER_PATH = "/home/tmax/Audi";

	@RequestMapping("/download")
	public ModelAndView download(@RequestParam HashMap<Object, Object> params, ModelAndView mv) {
		String fileName = (String) params.get("fileName");
		String fullPath = FILE_SERVER_PATH + "/" + fileName;
		File file = new File(fullPath);
		
		mv.setViewName("downloadView");
		mv.addObject("downloadFile", file);
		return mv;
	}
	
	
	//@RequestMapping(value = "/fileupload",method = RequestMethod.POST)
	@PostMapping("/fileupload")
	public String upload(MultipartFile uploadfile){

	    saveFile(uploadfile);
	    return "home/home";
	}
	
	//@RequestMapping(value = "/fileupload2", metCChod = RequestMethod.POST)
	@PostMapping("/fileupload2")
	public String upload(MultipartFile[] uploadfiles, Model model){

	    String result = "";
	    for(MultipartFile f : uploadfiles){
	        result += saveFile(f);
	    }
	    model.addAttribute("result",result);

	    return "home/home";
	}
	
	private String saveFile(MultipartFile file){
	    // ���� �̸� ����
	    UUID uuid = UUID.randomUUID();
	    String saveName = uuid + "_" + file.getOriginalFilename();

	 

		// ������ File ��ü�� ����(������ ����)��
	    File saveFile = new File(FILE_SERVER_PATH,saveName); // ������ ���� �̸�, ������ ���� �̸�

	    try {
	        file.transferTo(saveFile); // ���ε� ���Ͽ� saveFile�̶�� ������ ����
	    } catch (IOException e) {
	        e.printStackTrace();
	        return null;
	    }

	   return saveName;
	    
	} // end saveFile
	
	
	
	
	
	
	
}