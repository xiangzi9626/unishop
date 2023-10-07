package com.example.springbootvue3.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.springbootvue3.entity.Order;
import com.example.springbootvue3.mapper.OrderMapper;
import com.example.springbootvue3.service.IOrderService;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author 丁祥 QQ 2421341497
 * @since 2023-07-08
 */
@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements IOrderService {
}
