package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Example;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.relational.core.query.Criteria;
import org.springframework.data.relational.core.sql.Conditions;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data SQL reactive repository for the Example entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExampleRepository extends ReactiveCrudRepository<Example, Long>, ExampleRepositoryInternal {
    Flux<Example> findAllBy(Pageable pageable);

    @Override
    <S extends Example> Mono<S> save(S entity);

    @Override
    Flux<Example> findAll();

    @Override
    Mono<Example> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface ExampleRepositoryInternal {
    <S extends Example> Mono<S> save(S entity);

    Flux<Example> findAllBy(Pageable pageable);

    Flux<Example> findAll();

    Mono<Example> findById(Long id);

    Flux<Example> findAllBy(Pageable pageable, Criteria criteria);
}
