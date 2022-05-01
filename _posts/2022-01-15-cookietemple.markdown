---
layout: single
title:  "Best-practice programming with cookietemple"
author_profile: true
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
date:   2022-05-01 10:00:00 +0200
categories: programming
author: Lukas Heumos and Philipp Ehmele
---

## Introduction

Software written in predominantly academic is often times of poor quality for manifold reasons. In academia, the key performance indicator is not necessarily a low number of bugs, but paper publications and citations, demonstrated in the publish or perish mantra. This goal is best achieved with quick proof of concepts and is contrary to rigorous planning and implementation of complex software. Software implementations of academic results are often solely side tracks to bump up the citation count. Moreover, most researchers have little programming experience and perceive programming solely as a tool to achieve a desired result, which was entirely self-learned when confronted with the problem at hand. Superficially learning a specific programming language is not inherently an issue by itself, but a lack of knowledge in how to produce and maintain quality software, is. This is a hurdle for self-taught programmers without a computer science background.

As researchers with a stronger programming background, we identified several additional problems with academic software throughout our studies or continuing academic and industry careers. Unfortunately, many researchers do not release their code along the corresponding publications, which not only makes it hard to reproduce the results, but also difficult to contribute and adapt the software. A further serious issue is that even when the code is published online, some software packages do not accompany the code with a license effectively preventing users from using and contributing the software. When contacting the authors of the software the responses posed a common theme. A lack of knowledge on how to and where to share software was frequently named as the reason for non-public code. Many researchers also named a lack of time as their reason for not uploading the code to an easily accessible repository. A few researchers also mentioned that they perceived their code as "being messy" and therefore not ready for public sharing. Moreover, researchers were not aware of the requirement to publish a license alongside the code even if they never intended to protect their code.

Due to wildly heterogeneous programming skill sets, not only between academic labs, but also already between lab members of the same group, there is a strong need for common software standards. Academic code is rarely rigorously tested with continuous integration (CI) and testing pipelines. Often times it is unclear whether the software still builds at all. Additionally, academic software is complex due to the nature of scientific research, but rarely well documented.
All of these issues hinder fruitful and efficient collaborations between academia and industry which poses a necessity to bring research into practice.

Here we introduce **cookietemple**, a Python based command-line tool providing best-practice project templates for several domains and programming languages which aims at solving all of the aforementioned issues.

## Overview of cookietemple

Initially, we tried distributing project templates among peers based on our existing projects, but quickly noticed several issues. First, these templates were not necessarily customizable and second, these templates were quickly out of date and there was no easy way to update all existing projects to the new standards.

| ![cookietemple overview](/assets/images/blog-posts/cookietemple/CT_OV.png) | 
|:--:| 
| *Overview of cookietemple* |

As a matter of necessity to ensure that our very own research software tools are of highest quality and can be developed in academic and industry collaborations we founded the cookiejar organization in 2020. The first major project of the cookiejar organization is cookietemple. cookietemple is a Python based command line tool providing best-practice project templates for various domains and languages with additional helper tools. As of November 2021 cookietemple has been implemented as a proof of concept with best-practice templates for Python packages, C++ libraries, Java based command line tools and graphical user interfaces. With more than 100 Github stars and 28000 downloads cookietemple enjoys some popularity and is well received in the community. Further, cookietemple was able to attract several developers beyond the two initiators of the project which contribute to the project regularly through bug reports and code contributions. We want to highlight that for example the support for the Microsoft Windows operating system was solely contributed by external contributors. Extensive documentation is available on [Read The Docs](https://cookietemple.readthedocs.io/en/latest/). Currently, the community around cookietemple is organized through a [Discord server](https://discord.com/invite/PYF8NUk) as well as Github issues. A [website](https://cookietemple.com) showcasing cookietemple and the templates represent the public profile.
In the following subsections we will introduce the core ideas of cookietemple in more detail and outline how cookietemple will be developed further.

## Philosophy

cookietemple is supposed to decrease the complexity and on boarding time of moderately experienced developers such as academics to highly modern best-practice projects. Therefore, many processes such as the increasing of a version across several files or the writing of release notes are automated. Further, to facilitate contributions to different projects from even different domains or programming languages, the cookietemple based projects feature common designs. This is especially important in an academic settings where collaborations and specific contributions to a high number of different projects are imperative and encouraged. As a result we also put an emphasis on ensuring that contributions to cookietemple based projects are correctly credited. Finally, developing is supposed to feel modern and be fun while teaching less experienced users throughout the process. Developers are not supposed to fight against, but to actually embrace the tooling.

| ![cookietemple workflow](/assets/images/blog-posts/cookietemple/CT_WF.png) | 
|:--:| 
| *(a) Project development without cookietemple. Developers work independently on a project with their own standards and workflows, which may not be compatible with the other developers. (b) Project development using cookietemple. Creating a cookietemple project and work with it, linting, sync and other template features like GitHub Actions will ensure adherence to common standards which simplifies collaboration between the institutions.* |

## Creating projects with cookietemple

cookietemple guides users interactively through the creation of a new project. Internally, cookietemple populates the template with user selected values using [cookiecutter](https://cookiecutter.readthedocs.io/en/latest/) and copies the by all templates shared files into the template to finally create a user defined project. The created project is then automatically pushed to a newly created Github repository. This facilitates and encourages code sharing for research software from the very beginning.

| ![Creating projects with cookietemple](/assets/images/blog-posts/cookietemple/create.gif) | 
|:--:| 
| *Creating projects interactively with cookietemple* |

## Templates

The best-practice templates are at the core of cookietemple. The currently available templates are:

* cli-python: Python based libraries or command line tools
* cli-java: Native Java command line interface tools
* lib-cpp: C++ based libraries
* gui-java: Java based graphical user interfaces with JavaFX
* web-website: Websites with a Python based backend

One of the key ideas behind all of cookietemple's templates is that they share a common design and feature set. All templates feature a Makefile unifying and abstracting common tasks like the installation (*make install*) of the tool or library, or the building of the documentation (*make docs*). Therefore, for simple tasks, deep knowledge of the build tools is not required. The common files for all templates also feature a consolidated Sphinx documentation setup. Hence, developers of cookietemple based projects can easily update the documentation of projects ensuring that it is always up to date. Modern developing entails continuous integration and testing which the templates provide in the form of pre-configured Github Actions. Although some of the template specific Github Actions workflows differ due to the language specific setup, all of them are based on the same service. Hence, learning a new CI service when contributing to other projects is not necessary. Here, we want to highlight one particular Github Action which all templates share. In academic settings it is especially important to highlight contributions. cookietemple facilitates this through the integration of pre-configured [release-drafter](https://github.com/release-drafter/release-drafter)). Whenever pull requests are made against the (development) branch, the type of contribution (feature, bug fix, etc.) is automatically detected from the branch name and the pull request gets the corresponding label. Later, when the pull request is merged, the draft release notes get automatically updated with a link to the pull request and the Github username of the contributor in the corresponding section (e.g. bugs for a bug fix).

| ![Release drafter example](/assets/images/blog-posts/cookietemple/RD.png) | 
|:--:| 
| *Example release drafter release notes* |

As a result, if users are familiar with a single cookietemple template they can much more easily contribute to projects of even different domains and languages. Therefore, collaborations between different non-full-time software developers are strengthened because the start up time of often times stressed academics is greatly reduced and contributions are fully credited.

We will now introduce two templates in greater detail to highlight the extensive design of the templates.

### cli-python

cli-python is the most popular cookietemple template. It is based on Claudio Jolowicz's [cookiecutter-hypermodern-python](https://github.com/cjolowicz/cookiecutter-hypermodern-python) but was slightly adapted to fit into cookietemple's design and use the by all templates shared files. It should be noted that cookietemple itself is bootstrapped on based on cookietemple's cli-python template.\\
Next to an extensive Github Actions, Sphinx documentation, cookietemple sync and bump-version (see below) and Makefile setup, cli-python is making heavy use of [Poetry](https://github.com/python-poetry/poetry) and [nox](https://nox.thea.codes/en/stable/). Poetry is the modern way of building Python packages with deterministic builds, lock files and an intuitive command line interface to build and publish packages. The improved dependency solver ensures that the package builds and runs at every stage of development which is not guaranteed with the still commonly used [Setuptools](https://setuptools.pypa.io/en/latest/) based build process. Further, the complete configuration is stored and managed with a single *pyproject.toml* file and not across several files such as the formerly required *setup.py*, *setup.cfg*, *MANIFEST.in* and *requirements.txt*. To allow for tests to run in multiple environments cli-python uses nox. As pre-configured in the template, a single *nox* call will format the code with [black](https://black.readthedocs.io/en/stable/), lint the code with flake8\cite{flake8}, run various pre-commit checks such as [Check Yaml](https://pre-commit.com/hooks.html), sort imports with [isort](https://pycqa.github.io/isort/), verify typehints with [mypy](http://mypy-lang.org/), run tests with [pytest](https://docs.pytest.org/en/latest/), unit test coverage with [Codecov](https://about.codecov.io/), uprade syntax with [pyupgrade](https://github.com/asottile/pyupgrade) and more. Most of the style and code smells are fixed automatically with a single nox run and the ones that cannot be automatically fixed explain the issue and a proposed fix clearly to the user. This ensures that the code is always of high quality with a consistent style.

### lib-cpp

The second most popular cookietemple template is lib-cpp which is based on and was contributed by Filip-Ioan Dutescu's [modern-cpp-template](https://github.com/filipdutescu/modern-cpp-template). Based on [CMake](https://cmake.org/), the project can be build as either a header-only library, an executable or even as a static or shared library. The template further provides the option to use C++ package managers such as [Conan](https://conan.io/) and [Vcpkg](https://vcpkg.io/en/index.html) by default. While integrating all cookietemple common files, the Github Actions CI workflows are for Windows, Linux and MacOS are cache optimized to ensure a minimal run time. Easily maintainable code is ensured with a Clang-Format configuration inspired by the base Google model. This is complemented by static analyzers such as [Clang-Tidy](https://clang.llvm.org/extra/clang-tidy/) and [Cppcheck](https://cppcheck.sourceforge.io/). Pre-configured [GoogleTest](https://google.github.io/googletest/) and GoogleMock provide unit testing support complemented with Codecov support. The complete setup allows for multi platform development with high maintainability to ensure that researchers and industry in all environments can make use of the developed software which is unfortunately still a challenge in the C++ ecosystem.

## helper tools 

Beyond the creation of templates, the cookietemple command line interface provide several helper tools.

### lint

To ensure that no essential files of the project is deleted, the version across all configuration files is consistent and more, cookietemple provides a *cookietemple lint* command which checks an existing project against a set of pre-defined rules. If any of the rules are found to be violated the user is made aware together with a link to allow him to resolve the issue.

| ![lint example](/assets/images/blog-posts/cookietemple/lint.gif) | 
|:--:| 
| *Example cookietemple lint* |

### sync

Users usually create their projects with the latest version of cookietemple wherein all templates itself are also versioned. However, if we, as developers of cookietemple, develop further features for a template or fix a critical bug, we want to update all already existing templates with these additions. This is possible with the tool *cookietemple sync* which is automatically triggered every night with a Github Actions workflow. If *cookietemple sync* detects that the version that the project was created with is lower than the latest corresponding template version of the latest cookietemple release, a pull request is made against the *development* branch. The pull request only contains the changes between the two respective template versions. This is possible with the during the project creation phase created TEMPLATE branch which is used for the git diff. All in all, *cookietemple sync* ensures that all existing projects benefit from continuous development of cookietemple and that all projects always use the same basis, a central promise of cookietemple.

| ![sync example](/assets/images/blog-posts/cookietemple/sync.gif) | 
|:--:| 
| *Example cookietemple sync* |

### bump-version

Increasing the version across several configuration files is not only a cumbersome, but also error-prone process. Hence, cookietemple provides an easily configurable *cookietemple bump-version* command which increases the version of all configuration files. When doing so cookietemple assures that the new version adheres to [semantic versioning](https://semver.org/). The per template pre-configured *cookietemple.cfg* configuration file which every template ships with allows for configuration files to be blacklisted (don't increase any version in this file except for specifically marked code lines) or whitelisted (increase all matching versions in this file except specifically marked code lines) for minimal configuration overhead.

| ![bump-version example](/assets/images/blog-posts/cookietemple/bump_version.gif) | 
|:--:| 
| *Example bump-version* |

## Use-cases

### Deterministic machine learning with mlf-core

Although machine learning has shown huge growth in popularity in recent years, previous studies highlighted a [reproducibility crisis in machine learning](https://www.science.org/doi/abs/10.1126/science.359.6377.725). In a collaboration across several academic groups, we identified the technical reasons for non-deterministic machine learning and developed the first complete solution for deterministic machine learning termed [mlf-core](https://www.science.org/doi/abs/10.1126/science.359.6377.725). mlf-core has been downloaded more than 35000 times on PyPI and enjoys users from academia as well as industry. Since the first release in August 2020 more than 30 new versions have been released with contributions from 5 researchers demonstrating the effectiveness of automation. Moreover, every release clearly highlighted contributions from individuals ensuring that the work is correctly credited. A [preprint](https://arxiv.org/abs/2104.07651) with many more details is available.

### ncem - learning cell communication from spatial graphs of cells

Cellular variation in tissue niches is key to understanding tissue phenotypes in human and other species. Cell cell communication events can be examined by observing the interaction of a cell with its niche *via* molecular profiling assays of single cells. Based on the cookietemple cli-python template, node-centric expression modeling [NCEM](https://github.com/theislab/ncem), a computational method on graph neural networks reconciling variance attribution and communication modeling in a single model of tissue niches was developed in rapid speed. This was greatly sped up possible due to the familiarity of the lab members with cookietemple and the highly automated processes. A [preprint](https://www.biorxiv.org/content/10.1101/2021.07.11.451750v1) with many more details is available.

## Outlook

Although cookietemple already works and enjoys a growing user base, development has only just begun. cookietemple is designed to be easily extendable with additional project templates. Hence, one of our next goals in the first quarter of 2022 is to introduce further templates to cookietemple for programming languages such as Rust for memory safe high performance software, Julia for scientific computing and Typescript for scientific visualizations. To ensure that the templates are of highest quality we will work together with experts for these languages and borrow from already existing popular templates if the licenses allow.

Moreover, we are aware of the fact that many companies use different CI services than Github Actions which might even be self hosted. Hence, in the second quarter of 2022 we want to provide additional configurations for Azure, Jenkins and other popular CI services to ensure that industry and academia can continue to use a common set of tools. Additionally, companies tend to use different git hosting services such as (self-hosted) Gitlab which we also want to provide support for. Users will be able to select whether they want to push their just created project to Github, Gitlab or any other git hosting service.

To increase the visibility of scientific software in the research community we want to implement the automatic creation of a Zendodo DOI for every new project if the user so desires in the second quarter of 2022. This DOI will be automatically included in the projects README and therefore (rendered) documentation. Since Zenodo DOIs automatically include all contributors to a project it will ensure that all commits are credited to reward contributions.

We will further increase the visibility of cookietemple by giving talks at scientific and programming venues.

## Code availability

The code for cookietemple is available at [https://github.com/cookiejar/cookietemple](https://github.com/cookiejar/cookietemple) under the Apache 2.0 license with the corresponding documentation at [https://cookietemple.readthedocs.io/en/latest/](https://cookietemple.readthedocs.io/en/latest/). The use-cases can be found at [https://github.com/mlf-core/mlf-core/](https://github.com/mlf-core/mlf-core/) and [https://github.com/theislab/ncem](https://github.com/theislab/ncem) respectively.

## Credits

cookietemple is a joint project of Lukas Heumos and Philipp Ehmele who are both members of the Theislab. The text was primarily written by Lukas Heumos and the figures were primarily created by Philipp Ehmele. Both authors want to emphasize that they greatly appreciate feedback.
