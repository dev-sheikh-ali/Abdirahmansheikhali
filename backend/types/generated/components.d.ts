import type { Schema, Struct } from '@strapi/strapi';

export interface HomeCommunityImpact extends Struct.ComponentSchema {
  collectionName: 'components_home_community_impacts';
  info: {
    displayName: 'communityImpact';
  };
  attributes: {
    date: Schema.Attribute.Date;
    description: Schema.Attribute.Blocks & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    location: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface HomeContactIcon extends Struct.ComponentSchema {
  collectionName: 'components_home_contact_icons';
  info: {
    displayName: 'contactIcon';
  };
  attributes: {
    icon: Schema.Attribute.String;
    link: Schema.Attribute.String;
    platform: Schema.Attribute.Enumeration<
      ['GitHub', 'LinkedIn', 'Email', 'Resume']
    >;
  };
}

export interface HomeExpertise extends Struct.ComponentSchema {
  collectionName: 'components_home_expertise';
  info: {
    displayName: 'expertise';
  };
  attributes: {
    decription: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHeroButton extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_buttons';
  info: {
    displayName: 'heroButton';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['primary', 'secondary ']>;
  };
}

export interface HomeSkill extends Struct.ComponentSchema {
  collectionName: 'components_home_skills';
  info: {
    displayName: 'skill';
  };
  attributes: {
    icon: Schema.Attribute.String;
    name: Schema.Attribute.String;
    number: Schema.Attribute.Decimal;
  };
}

export interface HomeSkillCategory extends Struct.ComponentSchema {
  collectionName: 'components_home_skill_categories';
  info: {
    displayName: 'skillCategory';
  };
  attributes: {
    category: Schema.Attribute.String;
    category_icon: Schema.Attribute.String;
    skills: Schema.Attribute.Component<'home.skill', true>;
  };
}

export interface ProjectTechStack extends Struct.ComponentSchema {
  collectionName: 'components_project_tech_stacks';
  info: {
    displayName: 'techStack';
  };
  attributes: {
    icon: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'home.community-impact': HomeCommunityImpact;
      'home.contact-icon': HomeContactIcon;
      'home.expertise': HomeExpertise;
      'home.hero-button': HomeHeroButton;
      'home.skill': HomeSkill;
      'home.skill-category': HomeSkillCategory;
      'project.tech-stack': ProjectTechStack;
    }
  }
}
