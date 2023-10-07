package com.example.springbootvue3.controller.user;

import com.example.springbootvue3.entity.Order;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author 丁祥 QQ 2421341497
 * @since 2022-11-14
 */
@RestController(value = "userOrderController")
@RequestMapping("/user/order")
public class OrderController {
    @RequestMapping("/add")
    public Map<String, Object> add(@RequestBody Object order) {
        System.out.println("ab");
        System.out.println(order);
        return null;
    }

    @RequestMapping("/list")
    public Map<String, Object> list(@RequestParam("state") String state) {
        return null;
    }
}
