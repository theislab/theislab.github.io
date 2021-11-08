---
layout: single
title:  "Example Blog Post"
author_profile: true
toc: true
toc_label: "Table of Contents"
toc_icon: "cog"
date:   2021-10-25 14:28:06 +0200
categories: test
author: Theislab
---

General Text Formatting
-------------
Paragraphs are separated by a blank line.

2nd paragraph. *Italic*, **bold**, and `monospace`. 


Itemized lists look like:

  * this one
  * that one
  * the other one
  
Here's a numbered list:

 1. first item
 2. second item
 3. third item
 
 
Now a nested list:

 1. First, get these ingredients:

      * carrots
      * celery
      * lentils

 2. Boil some water.

 
Note that --- not considering the asterisk --- the actual text
content starts at 4-columns in.

> Block quotes are
> written like so.
>
> They can span multiple paragraphs,
> if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all
in chapters 12--14"). Three dots ... will be converted to an ellipsis.
Unicode is supported. ☺

Code
-------------
~~~python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
~~~


External References
-------------
Here's a link to [a website](https://github.com/theislab), 
to a [local doc](local-doc.html), 
and to a [section heading in the current doc](#General-Text-Formatting). 

Here's a footnote [^1].

[^1]: Footnote text goes here.


Figures
-------------

![example image](/assets/images/blog-posts/example-blog-post/fox.png "An exemplary image")

Equations
-------------

Inline math equations go in like so: $\omega = d\phi / dt$. Display
math should get its own line and be put in in double-dollarsigns:

$$I = \int \rho R^{2} dV$$

And note that you can backslash-escape any punctuation characters
which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.
