# Chameleon

<img src="/static/build/logo.png" alt="Chameleon Logo">
A tool to make solving type errors in Haskell simple and fun

## Why Chameleon

- Human-Centered Methods

We improve each feature in Chameleon based on the feedback from the Haskell community. Debugging idioms in Chameleon has been tested individually and in combinations.

- Multi-location Type Errors

While many type systems try to pinpoint one exact error location in the code, the accuracy is often hit or miss. Chameleon tries to narrow down to a few suspects and asks the programmer to identify the real culprit. While both approaches have pros and cons, we believe Chameleon is more flexible and catches bugs faster.

- Unbiased Type Errors

Instead of assuming one type is "Expected" and one type is "Actual", Chameleon will report two equally possible alternatives that type errors can happen. Many techniques have been proposed to solve this problem (Known as left-right bias) on type solver level. Chameleon combines the type solver capable of eliminating this bias and smart visual cues to distinguish the evidence for one type and the other.

- Step-by-step Debugging

The deduction step is a tool to peek inside the type checking engine. It shows step-by-step reasoning that explains why one type cannot reconcile with another in simple language. Chameleon's interactive interface allows users to make incremental assumptions and see how that affects the typing of the whole program.


- More are coming!

Hang tight! We are working on more features to make Chameleon even better!

##  Playground

The chameleon playground is an online editor for you to test out some of the chameleon features.

[Go to playground](https://chameleon.typecheck.me/playground)
