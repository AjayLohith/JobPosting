package com.ajay.joblisting.controller;

import com.ajay.joblisting.model.Post;
import com.ajay.joblisting.repository.PostRepo;
import com.ajay.joblisting.repository.SearchRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/")
public class PostController {

    @Autowired
    PostRepo repo;

    @Autowired
    SearchRepo searchRepo;

    @GetMapping("/posts")
    public List<Post> getAllPosts(){
        return repo.findAll();
    }

    @GetMapping("/posts/{text}")
    public List<Post> searchPost(@PathVariable String text) {
        return searchRepo.searchByText(text);
    }

    @PostMapping("/posts")
    public Post addPost(@RequestBody Post post){
        return repo.save(post);
    }

}
