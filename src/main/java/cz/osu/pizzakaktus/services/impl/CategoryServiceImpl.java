package cz.osu.pizzakaktus.services.impl;

import cz.osu.pizzakaktus.endpoints.models.CategoryDTO;
import cz.osu.pizzakaktus.repositories.CategoryRepository;
import cz.osu.pizzakaktus.repositories.models.CategoryDb;
import cz.osu.pizzakaktus.services.CategoryService;
import org.assertj.core.util.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Created by Mish.k.a on 3. 11. 2016.
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public Optional<CategoryDb> insert(CategoryDTO categoryDTO) {
        CategoryDb savedObject = categoryRepository.save(new CategoryDb(categoryDTO));
        return Optional.of(savedObject);
    }

    @Override
    public List<CategoryDb> findAll() {
        Iterable<CategoryDb> all = categoryRepository.findAll();
        return Lists.newArrayList(all);
    }

    @Override
    public CategoryDb findById(Integer id) {
        return categoryRepository.findById(id);
    }

    @Override
    public List<CategoryDb> findAllById(List<Integer> ids) {
        Iterable<CategoryDb> all = categoryRepository.findAll(ids);
        return Lists.newArrayList(all);
    }
}
