package com.visiomatix.chat.chat.user.service;

import com.visiomatix.chat.chat.user.dto.UserDTO;
import com.visiomatix.chat.chat.user.dto.JwtResponseDTO;
import com.visiomatix.chat.chat.user.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

     User registerUser(UserDTO userDTO);
     JwtResponseDTO login(String username, String password);
     User updateUser(Long userId, UserDTO dto);
     void deleteUser(Long userId);
     User getUserByUsername(String username);
     User getOrCreateSystemUser();
     User getUserById(Long userId);

     // Admin operations
     List<User> getAllUsers();
     User assignRoleToUser(Long userId, Long roleId, String modifiedBy);
     User removeRoleFromUser(Long userId, Long roleId, String modifiedBy);
     User createUser(UserDTO userDTO, String createdBy);

     // Security helper methods
     boolean isCurrentUser(Long userId);
}
