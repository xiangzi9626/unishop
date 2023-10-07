package com.example.springbootvue3.controller.admin;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.example.springbootvue3.entity.Result;
import com.example.springbootvue3.entity.Specifications;
import com.example.springbootvue3.service.impl.SpecServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin/specifications")
public class SpecController {
    @Autowired
    private SpecServiceImpl specService;

    @RequestMapping("/list")
    public Map<String, Object> list(@RequestBody Map<String, Integer> param) {
        int currentPage = param.get("currentPage");
        int pageSize = param.get("pageSize");
        List<Map<String, Object>> specList = specService.specList((currentPage - 1) * pageSize, pageSize);
        long total = specService.count();
        Map<String, Object> map = new HashMap<>();
        map.put("total", total);
        map.put("data", specList);
        return map;
    }

    @RequestMapping("/add")
    public Map<String, Object> add(@RequestParam("name") String name, @RequestParam("value") String value, @RequestParam("cid") Integer cid) {
        Specifications specifications = new Specifications();
        specifications.setName(name);
        specifications.setValue(value);
        specifications.setCid(cid);
        Boolean save = specService.save(specifications);
        if (save) {
            return Result.success("添加成功");
        }
        return Result.error("提交失败请重试");
    }

    @RequestMapping("/delete")
    public Map<String, Object> delete(@RequestParam("id") Integer id) {
        Boolean delete = specService.removeById(id);
        if (delete) {
            return Result.success("删除成功");
        }
        return Result.error("删除失败请重试");
    }

    @RequestMapping("/edit")
    public Map<String, Object> edit(@RequestParam("id") Integer id, @RequestParam("name") String name, @RequestParam("value") String value, @RequestParam("cid") Integer cid) {
        Specifications specifications = new Specifications();
        specifications.setId(id);
        specifications.setCid(cid);
        specifications.setName(name);
        specifications.setValue(value);
        Boolean edit = specService.update(specifications, new UpdateWrapper<Specifications>().eq("id", id));
        if (edit) {
            return Result.success("提交成功");
        }
        return Result.error("提交失败请重试");
    }
    @RequestMapping("/get")
    public List<Specifications> getSpec(@RequestParam("cid") Integer cid){
        return specService.list(new QueryWrapper<Specifications>().eq("cid",cid));
    }
}
