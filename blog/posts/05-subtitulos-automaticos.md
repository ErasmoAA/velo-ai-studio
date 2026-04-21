---
num: "05"
slug: 05-subtitulos-automaticos
emoji: 📝
date: 2026-02-12
tag_es: Función
tag_en: Feature
title_es: "Subtítulos automáticos: cómo usar archivos SRT"
title_en: "Automatic subtitles: how to use SRT files"
desc_es: Aprende a crear y formatear archivos SRT correctamente para generar subtítulos perfectos en tus videos con Velo AI Studio. Guía completa con ejemplos.
desc_en: Learn how to correctly create and format SRT files to generate perfect subtitles in your videos with Velo AI Studio. Complete guide with examples.
read_es: 5 min lectura
read_en: 5 min read
content_es: |
  El archivo SRT (SubRip Subtitle) es el formato de entrada principal de Velo AI Studio. Es un archivo de texto plano con una estructura muy específica que indica qué texto aparece en pantalla y en qué momento exacto. Entender cómo crearlo y formatearlo correctamente es la clave para obtener videos con subtítulos perfectos.

  ## ¿Qué es un archivo SRT?

  SRT son las siglas de SubRip Subtitle. Es el formato de subtítulos más universal y compatible. Se trata de un archivo de texto simple (con extensión **.srt**) que sigue este patrón repetido para cada subtítulo:

  ```
  [número del subtítulo]
  [hora inicio] --> [hora fin]
  [texto del subtítulo]
  [línea en blanco]
  ```

  ## Ejemplo de archivo SRT completo

  Así se ve un archivo SRT bien formateado para un video sobre el sistema solar:

  ```
  1
  00:00:00,000 --> 00:00:04,500
  El sistema solar tiene ocho planetas orbitando el Sol.

  2
  00:00:04,500 --> 00:00:09,000
  Mercurio es el más cercano y el más pequeño de todos.

  3
  00:00:09,000 --> 00:00:14,200
  Venus tiene una temperatura superficial de 465 grados centígrados.

  4
  00:00:14,200 --> 00:00:19,800
  La Tierra es el único planeta conocido con vida.
  ```

  ## Reglas de formato importantes

  ### El separador de tiempo usa coma, no punto

  Los milisegundos van separados por una coma, no por un punto. Este es el error más común.

  - ❌ Incorrecto: `00:00:04.500 --> 00:00:09.000`
  - ✓ Correcto: `00:00:04,500 --> 00:00:09,000`

  ### Línea en blanco entre cada bloque

  Debe haber exactamente una línea en blanco entre cada subtítulo. Si no hay línea en blanco, Velo no podrá separar correctamente los segmentos.

  ### Los números deben ser secuenciales

  Cada bloque debe numerarse de forma consecutiva empezando desde 1.

  ## Herramientas gratuitas para crear archivos SRT

  - **Subtitle Edit** (Windows) — Software gratuito y completo para crear y editar subtítulos.
  - **Aegisub** (Windows/Mac/Linux) — Muy popular entre subtituladores profesionales.
  - **Jubler** (multiplataforma) — Interfaz sencilla y compatible con muchos formatos.
  - **Notepad / TextEdit** — Puedes crear el archivo SRT directamente en un editor de texto y guardarlo con la extensión .srt.

  > **Consejo para creadores de YouTube:** Si ya tienes videos en YouTube con subtítulos automáticos, puedes descargarlos en formato SRT desde el panel de YouTube Studio y usarlos directamente en Velo AI Studio.

  ## Longitud ideal de cada segmento

  Para que las imágenes generadas por IA queden bien sincronizadas, cada segmento SRT debería durar entre **3 y 8 segundos**. Segmentos muy cortos (menos de 2 segundos) no dan tiempo suficiente para que la imagen se vea. Segmentos muy largos (más de 15 segundos) reducen el dinamismo visual del video.

  ## ¿Puedo usar el modo Audio en vez de SRT?

  Sí. Si prefieres no crear un archivo SRT manualmente, puedes subir directamente tu archivo de audio MP3 o WAV. Velo AI Studio dividirá el audio en segmentos y generará imágenes para cada uno. Sin embargo, usar un SRT propio te da más control sobre exactamente qué imagen aparece con cada frase.

content_en: |
  The SRT (SubRip Subtitle) file is the primary input format for Velo AI Studio. It is a plain text file with a very specific structure that indicates what text appears on screen and at exactly what time. Understanding how to create and format it correctly is the key to getting videos with perfect subtitles.

  ## What is an SRT file?

  SRT stands for SubRip Subtitle. It is the most universal and compatible subtitle format. It is a simple text file (with a **.srt** extension) that follows this repeating pattern for each subtitle:

  ```
  [subtitle number]
  [start time] --> [end time]
  [subtitle text]
  [blank line]
  ```

  ## Example of a complete SRT file

  Here's what a well-formatted SRT file looks like for a video about the solar system:

  ```
  1
  00:00:00,000 --> 00:00:04,500
  The solar system has eight planets orbiting the Sun.

  2
  00:00:04,500 --> 00:00:09,000
  Mercury is the closest and smallest of all.

  3
  00:00:09,000 --> 00:00:14,200
  Venus has a surface temperature of 465 degrees Celsius.

  4
  00:00:14,200 --> 00:00:19,800
  Earth is the only planet known to harbor life.
  ```

  ## Important formatting rules

  ### Time separator uses a comma, not a period

  Milliseconds are separated by a comma, not a period. This is the most common mistake.

  - ❌ Wrong: `00:00:04.500 --> 00:00:09.000`
  - ✓ Correct: `00:00:04,500 --> 00:00:09,000`

  ### Blank line between each block

  There must be exactly one blank line between each subtitle. If there is no blank line, Velo won't be able to correctly separate the segments.

  ### Numbers must be sequential

  Each block must be numbered consecutively starting from 1.

  ## Free tools to create SRT files

  - **Subtitle Edit** (Windows) — Free and complete software for creating and editing subtitles.
  - **Aegisub** (Windows/Mac/Linux) — Very popular among professional subtitlers.
  - **Jubler** (multiplatform) — Simple interface compatible with many formats.
  - **Notepad / TextEdit** — You can create the SRT file directly in a text editor and save it with the .srt extension.

  > **Tip for YouTube creators:** If you already have YouTube videos with automatic subtitles, you can download them in SRT format from the YouTube Studio panel and use them directly in Velo AI Studio.

  ## Ideal segment length

  For AI-generated images to be well synchronized with the content, each SRT segment should last between **3 and 8 seconds**. Very short segments (less than 2 seconds) don't give enough time for the image to be seen. Very long segments (more than 15 seconds) reduce the visual dynamism of the video.

  ## Can I use Audio mode instead of SRT?

  Yes. If you prefer not to create an SRT file manually, you can directly upload your MP3 or WAV audio file. Velo AI Studio will split the audio into segments and generate images for each one. However, using your own SRT gives you more control over exactly which image appears with each phrase.
---
