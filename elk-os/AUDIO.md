# ElkOS Audio

## Connect ADC/DAC Hat

Check that audio hat is connected:

```sh
cat /tmp/audio_hat
```

Test plugin in Sushi to test audio input/output:

_"Unlike when running on a regular Linux machine, Sushi doesn’t use JACK for audio on the Raspberry Pi, so you should run Sushi using the -r switch for selecting our RASPA low-latency front-end:"_

```
$ sushi -r --multicore-processing=2 -c ~/config_files/play_vst3.json &
```

## Links

- [ElkOS Audio Hat Docs](https://elk-audio.github.io/elk-docs/html/documents/run_elk_on_boards.html)
- [HifiBerry ADC/DAC Studio RPi Hat](https://www.hifiberry.com/shop/boards/hifiberry-studio-dacadc-xlr/)
