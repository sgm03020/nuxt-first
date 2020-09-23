<!--
<template>
  <div class="container">123</div>
</template>
-->
<!--
<template>
  <v-row no-gutters>
    <v-col v-for="n in 3" :key="n" cols="12" sm="4">
      <v-card class="pa-2" outlined tile>One of three columns</v-card>
    </v-col>
  </v-row>
</template>
-->
<!--
<template>
  <v-row justify="center" align="center" no-gutters>
    <v-col cols="1" sm="1">
      <v-card class="pa-2" outlined>1</v-card>
    </v-col>
    <v-col cols="1" sm="1">
      <v-card class="pa-2" outlined>2</v-card>
    </v-col>
    <v-col cols="1" sm="1">
      <v-card class="pa-2" outlined>3</v-card>
    </v-col>
    <v-col cols="1" sm="1">
      <v-card class="pa-2" outlined>4</v-card>
    </v-col>
    <v-col cols="1" sm="1">
      <v-card class="pa-2" outlined>5</v-card>
    </v-col>
    <v-col cols="1" sm="1">
      <v-card class="pa-2" outlined>6</v-card>
    </v-col>
    <v-col cols="1" sm="1">
      <v-card class="pa-2" outlined>7</v-card>
    </v-col>
  </v-row>
</template>
-->
<!--
<template>
  <v-row no-gutters>
    <v-col cols="1" sm="1">
      <v-card class="pa-2" outlined tile>時</v-card>
    </v-col>
    <v-col v-for="n in 6" :key="n" cols="2" sm="2">
      <v-card class="pa-2" outlined tile>{{n}}</v-card>
    </v-col>
  </v-row>
</template>
-->
<template>
  <v-row no-gutters>
    <v-row cols="6" no-gutters>
      <v-row no-gutters>
        <v-col cols="3">
          <v-card outlined>
            <v-card-title>時</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card outlined>
            <v-card-title>1</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card outlined>
            <v-card-title>2</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card outlined>
            <v-card-title>3</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-row>
    <v-row cols="6" no-gutters>
      <v-row no-gutters>
        <v-col cols="3">
          <v-card outlined>
            <v-card-title>4</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card outlined>
            <v-card-title>5</v-card-title>
          </v-card>
        </v-col>
        <v-col cols="3">
          <v-card outlined>
            <v-card-title>6</v-card-title>
          </v-card>
        </v-col>        
        <v-col cols="3">
          <v-card outlined>
            <v-card-title>7</v-card-title>
          </v-card>
        </v-col>        
      </v-row>
    </v-row>
  </v-row>
</template>
<!--
<template>
  <div class="Grid">
    <div>
      <v-card class="pa-0" outlined tile>
        <v-card-title>時</v-card-title>
      </v-card>
    </div>
    <div v-for="n in 7" :key="n">
      <v-card class="pa-0" outlined tile>
        <v-card-title>{{n}}</v-card-title>
      </v-card>
    </div>
  </div>
</template>
<style scoped>
.Grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 2px;
}
</style>
-->