package uk.ac.reigate.config.security;

import org.springframework.core.annotation.Order
import org.springframework.security.web.context.AbstractSecurityWebApplicationInitializer

/**
 * Sets up the Spring Security filter chain
 *
 */
@Order(2)
public class SecurityWebApplicationInitializer extends AbstractSecurityWebApplicationInitializer {
}
