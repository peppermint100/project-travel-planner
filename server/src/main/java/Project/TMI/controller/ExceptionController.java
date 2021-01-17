package Project.TMI.controller;

import Project.TMI.advice.exception.CAccessDeniedException;
import Project.TMI.advice.exception.CAuthenticationEntryPointException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/exception/")
public class ExceptionController {

    @GetMapping("accessdenied")
    public void AccessDeniedException(){
        throw new CAccessDeniedException();
    }

    @GetMapping("entrypoint")
    public void CAuthenticationEntryPointException(){
        throw new CAuthenticationEntryPointException();
    }


}
