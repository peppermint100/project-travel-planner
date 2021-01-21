package com.example.projecttravelplanner.fragments

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import com.example.projecttravelplanner.R
import com.example.projecttravelplanner.databinding.FragmentHomeBinding
import com.example.projecttravelplanner.databinding.FragmentMyPageBinding

class MyPageFragment: Fragment(R.layout.fragment_my_page) {
    private lateinit var binding: FragmentMyPageBinding

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        binding = FragmentMyPageBinding.bind(view)
    }
}