package com.example.springbootvue3.service.impl;

import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.springbootvue3.entity.Address;
import com.example.springbootvue3.mapper.AddressMapper;
import com.example.springbootvue3.service.IAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author 丁祥 QQ 2421341497
 * @since 2023-07-08
 */
@Service
public class AddressServiceImpl extends ServiceImpl<AddressMapper, Address> implements IAddressService {
    @Autowired
    private AddressMapper addressMapper;
    private Address address;

    @Transactional
    public void setDefault(Integer id, Integer uid) {
        addressMapper.update(address, new UpdateWrapper<Address>().eq("uid", uid).eq("selected", 1).set("selected",0));
        addressMapper.update(address, new UpdateWrapper<Address>().eq("id", id).set("selected", 1));
    }
}
