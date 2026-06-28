use utoipa::{
    OpenApi, 
    openapi::{
        security::{
            HttpAuthScheme, 
            HttpBuilder, 
            SecurityScheme,
        },
    },
};
use crate::{
    auth::dto::{
        LoginRequest, 
        RegisterRequest, 
        TokenResponse,
    }, 
    brain_dump::dto::{
        BrainDumpDeleteRequest, 
        BrainDumpPostRequest, 
        BrainDumpResponse,
    },
};

#[derive(OpenApi)]
#[openapi(
    paths(
        crate::auth::handlers::register,
        crate::auth::handlers::login,
        crate::brain_dump::handlers::delete_brain_dumps,
        crate::brain_dump::handlers::get_brain_dumps,
        crate::brain_dump::handlers::post_brain_dump,
    ),
    components(
        schemas(
            LoginRequest, 
            RegisterRequest, 
            TokenResponse,
            BrainDumpResponse,
            BrainDumpDeleteRequest,
            BrainDumpPostRequest,
        ),
    ),
    tags(
        (name = "auth", description = "Authentication related endpoints"),
        (name = "brain-dump", description = "Brain dump related endpoints"),
    ),
    // required for auth button and to add security for specific routes
    modifiers(&SecurityAddon)
)]
pub struct ApiDoc;

struct SecurityAddon;

impl utoipa::Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        let mut components = openapi.components.clone().unwrap_or_default();

        components.add_security_scheme(
            "bearerAuth",
            SecurityScheme::Http(
                HttpBuilder::new()
                    .scheme(HttpAuthScheme::Bearer)
                    .bearer_format("JWT")
                    .build(),
                ),
            );

        openapi.components = Some(components);
    }
}