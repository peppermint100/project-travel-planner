package com.example.projecttravelplanner.fragments

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.example.projecttravelplanner.R
import com.example.projecttravelplanner.databinding.FragmentForgotpasswordBinding
import com.example.projecttravelplanner.databinding.FragmentLoginBinding

class ForgotPasswordFragment: Fragment() {
    private val TAG: String = "로그"
    private lateinit var binding: FragmentForgotpasswordBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_forgotpassword, container, false)
        val view = binding.root
        return view
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Log.d(TAG, "LoginFragment - onCreate: ");
    }

}