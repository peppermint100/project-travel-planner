package com.example.projecttravelplanner.type.auth

data class LoginResponse (
    val success: Boolean,
    val msg: String,
    val token: String
)

data class SuspendedLoginResponse (
    val msg: String,
    val success: Boolean
)