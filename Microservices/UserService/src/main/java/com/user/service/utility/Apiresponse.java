package com.user.service.utility;

import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Apiresponse {

    private String message;
    private boolean success;
    private HttpStatus httpStatus;


}
