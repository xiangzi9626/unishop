package com.example.springbootvue3.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.springbootvue3.entity.Specifications;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 丁祥 QQ 2421341497
 * @since 2022-11-15
 */
public interface ISpecService extends IService<Specifications> {
    List<Map<String,Object>> specList(int limit1, int limit2);
}
