-- V6__add_abac_attributes_to_custom_roles.sql
-- Add ABAC attributes table for fine-grained access control

CREATE TABLE custom_role_abac_attributes (
    custom_role_id BIGINT NOT NULL,
    attribute_key VARCHAR(255) NOT NULL,
    attribute_value VARCHAR(255) NOT NULL,
    PRIMARY KEY (custom_role_id, attribute_key),
    FOREIGN KEY (custom_role_id) REFERENCES custom_roles(id) ON DELETE CASCADE
);

-- Add indexes for better performance
CREATE INDEX idx_custom_role_abac_attributes_custom_role_id ON custom_role_abac_attributes(custom_role_id);
CREATE INDEX idx_custom_role_abac_attributes_key ON custom_role_abac_attributes(attribute_key);