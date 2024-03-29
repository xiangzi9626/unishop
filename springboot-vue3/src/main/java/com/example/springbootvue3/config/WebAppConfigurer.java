package com.example.springbootvue3.config;

import com.example.springbootvue3.interceptor.AdminLoginInterceptor;
import com.example.springbootvue3.interceptor.UserLoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebAppConfigurer implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS")
                .maxAge(3600)
                .allowedHeaders("*");
    }

    @Bean
    public AdminLoginInterceptor adminLoginInterceptor() {
        return new AdminLoginInterceptor();
    }

    @Bean
    public UserLoginInterceptor userLoginInterceptor() {
        return new UserLoginInterceptor();
    }

    //注册拦截器
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(adminLoginInterceptor()).addPathPatterns("/admin/**")
                .excludePathPatterns("/*/**", "/admin/login", "/upload/*/**", "/admin/file/img/upload_goods_img", "/admin/file/img/editor_upload_img");
        registry.addInterceptor(userLoginInterceptor()).addPathPatterns("/user/**")
                .excludePathPatterns("/*/**", "/user/login", "/upload/*/**", "/admin/file/img/upload_goods_img", "/admin/file/img/editor_upload_img");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/upload/**")
                .addResourceLocations("file:" + System.getProperty("user.dir") + "/upload/");
    }
}
