package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.dto.UserDTO;
import com.visiomatix.chat.chat.user.model.User;

public interface UserService {

    User registerUser(UserDTO userDTO);
    String login(String username, String password);
    void deleteUser(Long userId);
    User getUserByUsername(String username);
}
