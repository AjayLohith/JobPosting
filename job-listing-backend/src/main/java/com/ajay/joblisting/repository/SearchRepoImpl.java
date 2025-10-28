package com.ajay.joblisting.repository;

import com.ajay.joblisting.model.Post;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.convert.MongoConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class SearchRepoImpl implements SearchRepo {

    @Autowired
    MongoClient client;

    @Autowired
    MongoConverter converter;

    @Override
    public List<Post> searchByText(String text) {
        List<Post> posts = new ArrayList<>();

        MongoDatabase database = client.getDatabase("springDb");
        MongoCollection<Document> collection = database.getCollection("jobListing");

        // ✅ Fixed pipeline: includes the "index" key and correct structure
        AggregateIterable<Document> result = collection.aggregate(Arrays.asList(
                                        new Document("$search",
                                        new Document("index", "default") // <-- MUST specify the search index name
                                        .append("text", new Document("query", text)
                                        .append("path", Arrays.asList("desc", "profile", "techs")))),
                                        new Document("$sort", new Document("exp", 1L)),
                                        new Document("$limit", 5L)
        ));

        result.forEach(doc -> posts.add(converter.read(Post.class, doc)));
        return posts;
    }
}
