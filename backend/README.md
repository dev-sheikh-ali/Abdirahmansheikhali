# Strapi Backend Setup

## Overview
- Comments are handled by GitHub Discussions/utteranc.es
- Blog content is managed through GitHub Issues

## Content Structure

### Single Types
- **Home**: Main landing page content

### Collections
- **Projects** (portfolio projects with tech stack)
- **Skills** (with nested skills[])
- **Expertise**
- **CommunityImpact**

## Components Setup

### Global Components

#### 1. TechStack (`techStack`)
- **name**: Text (required)
- **icon**: Text (optional)

### Home Components

#### 1. Hero Button (`heroButton`)
- **Label**: Text (required)
- **Link**: URL string (required)
- **Type**: Enum ["primary", "secondary"] (optional)

#### 2. Contact Icon (`contactIcon`)
- **Platform**: Enum ["GitHub", "LinkedIn", "Email", "Resume", "TikTok", "X/Twitter"] (required)
- **Icon**: Text/Media URL (required)
- **Link**: URL/email string (required)

#### 3. Skill (`skill`)
- **Name**: Text (required)
- **Icon**: Text/Media URL (optional)
- **Number**: Number - proficiency level (optional)

#### 4. Skill Category (`skillCategory`)
- **Category**: Text (required)
- **Category Icon**: Text/Media URL (optional)
- **Skills**: Repeatable skill component (required)

#### 5. Expertise (`expertise`)
- **Icon**: Text/Media URL (optional)
- **Title**: Text (required)
- **Description**: Rich Text (required)
- **Link**: URL string (optional)

#### 6. Community Impact (`communityImpact`)
- **Image**: Media (optional)
- **Description**: Rich Text (required)
- **Location**: Text (required)
- **Date**: Date (required)

## Projects Collection Structure
- **Title**: Text (required)
- **Slug**: Text (required, auto-generated from Title)
- **Thumbnail**: Media (required)
- **description**: Text (required)
- **GitHubLink**: Text (optional)
- **LiveLink**: Text (optional)
- **techStack**: Repeatable Component (`TechStack`)

## Home Single Type Structure

### Hero Section
- **Images**: Media (repeatable - slider images)
- **Intro**: Text (required)
- **Tagline**: Text (required)
- **Bio**: Rich Text (required)
- **CTA Primary**: heroButton component
- **CTA Secondary**: heroButton component
- **Contact Icons**: Repeatable contactIcon component

### Skills Section
- **Techskills**: Repeatable skillCategory component

### Expertise Section
- **Expertise**: Repeatable expertise component

### Community Impact Section
- **Community**: Repeatable communityImpact component
