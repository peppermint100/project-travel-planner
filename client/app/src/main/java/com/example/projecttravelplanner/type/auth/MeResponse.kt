package com.example.projecttravelplanner.type.auth

data class MeResponse(val userId: String, val username: String, val email: String, val success: Boolean, val msg: String)
