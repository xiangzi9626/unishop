package com.example.springbootvue3.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.springbootvue3.entity.Result;
import com.example.springbootvue3.entity.User;
import com.example.springbootvue3.service.impl.UserServiceImpl;
import com.example.springbootvue3.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserLoginController {
    @Autowired
    private UserServiceImpl userService;

    @RequestMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        User u = userService.getOne(new QueryWrapper<User>().eq("username", user.getUsername()).eq("password",user.getPassword()).eq("level",3));
        if (u == null) {
            return Result.error("用户名或密码错误!");
        }
        String token = JwtUtils.getJwtToken(u.getUsername());
        Map<String, Object> map = new HashMap<>();
        map.put("token", token);
        map.put("user", u);
        return Result.res(map);
    }

    @RequestMapping("/logout")
    public Map<String, Object> logout() {
        return Result.success("退出成功");
    }
}
