# Nuber Eats

Nuber Eats 클론 백엔드

## 유저 Entity:

- id
- createdAt
- updatedAt

- email
- password
- role(client|owner|delivery)

## 유저 CRUD

- Create Account
- Log In
- See Profile
- Edit Profile
- Verify Email

## What the heck is the nest js?

https://docs.nestjs.com/

### Description

Nest is a framework for building efficient, scalable Node.js server-side applications. It uses modern JavaScript, is built with TypeScript (preserves compatibility with pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, Nest makes use of Express, but also, provides compatibility with a wide range of other libraries, like e.g. Fastify, allowing for easy use of the myriad third-party plugins which are available.

### Philosophy

In recent years, thanks to Node.js, JavaScript has become the “lingua franca” of the web for both front and backend applications, giving rise to awesome projects like Angular, React and Vue which improve developer productivity and enable the construction of fast, testable, extensible frontend applications. However, on the server-side, while there are a lot of superb libraries, helpers and tools for Node, none of them effectively solve the main problem - the architecture.

Nest aims to provide an application architecture out of the box which allows for effortless creation of highly testable, scalable, loosely coupled and easily maintainable applications. The architecture is heavily inspired by Angular.

대충 요약하면 Nest는 Node.js "아키텍처"를 개선하기 위해 만든 프레임워크라는 뜻.

js로 프론트, 백엔드 모두 구현 가능한 상황에서

프론트엔드는 React, Vue, Angular 삼대장 프레임워크가 있는데

왜 Node는 없음? 해서 나온 것인듯

기본적으로 reusable을 지향하는 듯하다

지금 느낀 바로는 typeorm과 그래프큐엘의 type체킹을 한 번에 해줘서 간편하게 해줌

또한 entity를 컴포넌트화 시켜서 공통된 필드를 선언해줄 수 있음 (재사용성)

well, I think nest makes code very readable, clean, and reusable
these are what I felt just by now.

0. easy to init project
1. I like this kind of structure
   @Module({
   controllers: [CatsController],
   providers: [CatsService],
   })
   this looks beautiful ! we can see whole structure in a glance, and all that things reusable even in different projects!
1. One model, One folder <- how simple it is! beautiful architecture.
   ( in express, MVC model sometimes confused if it's quite huge application)
1. I believe decorator (@) makes to easier to build routing, get params etc, and It's recognizable by it's name itself is one of the advantages maybe??
1. also, making "core" entity and import another entity is good approach I think
   that means that it can be components for just what we want! and this improves productivity
1. official document is so kind haha but I found nest.js community is not so big yet
   https://docs.nestjs.com/
