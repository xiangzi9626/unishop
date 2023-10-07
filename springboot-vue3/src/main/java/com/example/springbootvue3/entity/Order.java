package com.example.springbootvue3.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * <p>
 *
 * </p>
 *
 * @author 丁祥 QQ 2421341497
 * @since 2022-11-14
 */
@Getter
@Setter
@TableName("order")
public class Order {

    @TableId(value = "id", type = IdType.AUTO)
    private Integer id;

    private String num;

    private String title;

    private String img;

    private String spec;
    private String gid;

    private BigDecimal price;
    private Integer count;
    private String address;
    private Integer refund;
    private Integer send;
    private Integer pay;
    private Integer state;
    @JsonFormat(timezone = "GMT+8", pattern = "yyyy-MM-dd")
    private LocalDateTime createTime;
}
