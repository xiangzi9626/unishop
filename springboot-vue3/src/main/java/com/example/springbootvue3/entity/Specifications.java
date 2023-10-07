package com.example.springbootvue3.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 *
 * </p>
 *
 * @author 丁祥 QQ 2421341497
 * @since 2022-11-15
 */
@Getter
@Setter
@TableName("specifications")
public class Specifications {
    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;
    private String name;
    private String value;
    private Integer cid;
}
