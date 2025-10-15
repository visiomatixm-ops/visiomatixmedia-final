package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.dto.UserDTO;
import com.visiomatix.chat.chat.user.dto.JwtResponseDTO;
import com.visiomatix.chat.chat.user.model.User;

public interface UserService {

    User registerUser(UserDTO userDTO);
    JwtResponseDTO login(String username, String password);
    User updateUser(Long userId, UserDTO dto);
    void deleteUser(Long userId);
    User getUserByUsername(String username);
}
