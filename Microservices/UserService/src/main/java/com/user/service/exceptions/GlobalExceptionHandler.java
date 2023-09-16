package com.user.service.exceptions;

import com.user.service.utility.Apiresponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Apiresponse> handlerResourceNotFoundException(ResourceNotFoundException ex)
    {
        String message = ex.getMessage();

        Apiresponse apiresponse = Apiresponse.builder().message(message).success(true).httpStatus(HttpStatus.NOT_FOUND).build();

        return new ResponseEntity<>(apiresponse,apiresponse.getHttpStatus());
    }

}
