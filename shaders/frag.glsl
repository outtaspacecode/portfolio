#version 300 es
precision highp float;

struct Material {
  vec3 color;
  float shininess;
};

struct Light {
  vec3 position;
  vec3 ambient;
  vec3 diffuse;
  vec3 specular;
};

in vec3 Normal;
in vec3 FragPos;

out vec4 FragColor;

uniform Material material;
uniform Light light;

void main() {
  vec3 normal = normalize(Normal);
  vec3 lightDir = normalize(light.position - FragPos);
  vec3 viewDir = normalize(-FragPos);
  vec3 reflectDir = reflect(-lightDir, normal);

  vec3 ambient = light.ambient * material.color;

  float diff = max(dot(lightDir, normal), 0.0f);
  vec3 diffuse = light.diffuse * diff * material.color;

  float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
  vec3 specular = light.specular * spec;

  vec3 final = ambient + diffuse + specular;
  FragColor = vec4(final, 1.0f);
}
