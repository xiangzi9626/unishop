package com.example.springbootvue3.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.springbootvue3.entity.Order;
import org.apache.ibatis.annotations.Mapper;

/**
 * <p>
 * Mapper 接口
 * </p>
 *
 * @author 丁祥 QQ 2421341497
 * @since 2023-07-08
 */
@Mapper
public interface OrderMapper extends BaseMapper<Order> {

}
