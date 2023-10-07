package com.example.springbootvue3.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.springbootvue3.entity.Address;
import com.example.springbootvue3.entity.Result;
import com.example.springbootvue3.service.impl.AddressServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user/address")
public class AddressController {
    @Autowired
    private AddressServiceImpl addressService;

    @RequestMapping("/add")
    public Map<String, Object> add(@RequestBody Address address) {
        System.out.println(address.getUid());
        long count = addressService.count(new QueryWrapper<Address>().eq("uid", address.getUid()));
        if (count >= 100) {
            return Result.error("地址数量达到上限");
        }
        if (count == 0) {
            address.setSelected(1);
        } else {
            address.setSelected(0);
        }
        Boolean save = addressService.save(address);
        if (save) {
            return Result.success("添加成功");
        } else {
            return Result.error("提交失败请重试");
        }
    }

    @RequestMapping("/edit")
    public Map<String, Object> edit(@RequestBody Address address) {
        Boolean update = addressService.updateById(address);
        if (update) {
            return Result.success("提交成功");
        } else {
            return Result.error("提交失败请重试");
        }
    }

    @RequestMapping("/delete")
    public Map<String, Object> delete(@RequestParam("uid") Integer uid, @RequestParam("id") Integer id) {
        Boolean remove = addressService.remove(new QueryWrapper<Address>().eq("uid", uid).eq("id", id));
        if (remove) {
            return Result.success("删除成功");
        } else {
            return Result.error("删除失败请重试");
        }
    }

    @RequestMapping("/list")
    public List<Address> list(@RequestParam("uid") Integer uid) {
        List<Address> list = addressService.list(new QueryWrapper<Address>().eq("uid", uid));
        return list;
    }

    @RequestMapping("/get")
    public Address get(@RequestParam("uid") Integer uid) {
        return addressService.getOne(new QueryWrapper<Address>().eq("uid", uid).eq("selected", 1));
    }

    @RequestMapping("/default")
    public Map<String, Object> setDefault(@RequestParam("id") Integer id, @RequestParam("uid") Integer uid) {
        try {
             addressService.setDefault(id, uid);
            return Result.success("设置成功");
        } catch (Exception e) {
            return Result.error("设置失败请重试");
        }
    }
}
