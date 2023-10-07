package com.example.springbootvue3.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.springbootvue3.entity.Specifications;
import com.example.springbootvue3.mapper.SpecMapper;
import com.example.springbootvue3.service.ISpecService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author 丁祥 QQ 2421341497
 * @since 2022-11-15
 */
@Service
public class SpecServiceImpl extends ServiceImpl<SpecMapper, Specifications> implements ISpecService {
    @Autowired
    private SpecMapper specMapper;
    @Override
    public List<Map<String,Object>> specList(int limit1, int limit2) {
        return specMapper.specList(limit1,limit2);
    }
}
