package com.example.springbootvue3.controller.test;

import com.example.springbootvue3.entity.Result;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class T1Controller {
    @RequestMapping("/test")
    public Map<String,Object> test(){
        return Result.success("成功");
    }
}
