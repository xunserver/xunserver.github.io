import{_ as n,o as a,c as i,a3 as l}from"./chunks/framework.CS9vaShW.js";const d=JSON.parse('{"title":"每日总结生成规则","description":"","frontmatter":{},"headers":[],"relativePath":"public/prompt/博客/文章模板/每日总结.md","filePath":"public/prompt/博客/文章模板/每日总结.md","lastUpdated":1784048876000}'),p={name:"public/prompt/博客/文章模板/每日总结.md"};function e(h,s,r,t,k,b){return a(),i("div",null,[...s[0]||(s[0]=[l(`<h1 id="每日总结生成规则" tabindex="-1">每日总结生成规则 <a class="header-anchor" href="#每日总结生成规则" aria-label="Permalink to &quot;每日总结生成规则&quot;">​</a></h1><p>根据当天与 GPT 的对话内容，整理出一份用于博客仓库“每日记录”的 Markdown 总结。</p><p>你的任务不是写普通博客文章，而是把当天与 GPT 的有效交流内容整理成结构清晰、可追溯、可复盘的每日记录。</p><h2 id="数据范围" tabindex="-1">数据范围 <a class="header-anchor" href="#数据范围" aria-label="Permalink to &quot;数据范围&quot;">​</a></h2><p>只处理当天的对话内容。</p><p>当天指用户指定的记录日期；如果没有指定日期，则以当前日期为准。</p><p>不要主动引用其他日期的聊天内容。<br> 如果当天对话中明确提到了历史上下文，可以只保留与当天结论直接相关的背景说明。</p><h2 id="记录目标" tabindex="-1">记录目标 <a class="header-anchor" href="#记录目标" aria-label="Permalink to &quot;记录目标&quot;">​</a></h2><p>生成一份每日记录，用来说明今天主要和 GPT 讨论了什么、完成了什么、形成了哪些结论、还有哪些待办。</p><p>重点记录：</p><ul><li>今天讨论过的主题</li><li>已完成的工程动作或内容动作</li><li>形成的判断、方案、规则或决策</li><li>发现的问题、原因和处理思路</li><li>未完成事项、后续待办和风险点</li></ul><p>不要逐字复述聊天记录。<br> 不要记录无意义寒暄、重复确认、工具调用细节或临时过程噪音。</p><h2 id="内容边界" tabindex="-1">内容边界 <a class="header-anchor" href="#内容边界" aria-label="Permalink to &quot;内容边界&quot;">​</a></h2><p>如果当天对话涉及博客仓库工程维护，应只总结工程相关内容，例如：</p><ul><li>仓库结构判断</li><li>配置、脚本、构建、部署、样式、路由等工程问题</li><li>修改计划、变更范围、验证结果</li><li>PR、分支、提交策略</li><li>风险和回滚点</li></ul><p>除非用户明确要求，不要改写、扩写、润色或重排博客文章正文。</p><p>如果当天对话涉及文章生成流程、提示词模板或写作规则，可以记录规则变更和目的，但不要替用户生成新的文章正文。</p><h2 id="隐私和安全" tabindex="-1">隐私和安全 <a class="header-anchor" href="#隐私和安全" aria-label="Permalink to &quot;隐私和安全&quot;">​</a></h2><p>不要记录以下内容：</p><ul><li>密钥、Token、Cookie、密码</li><li>私密链接、内部访问凭据</li><li>完整邮箱、手机号、地址等敏感个人信息</li><li>不必要的账号信息</li><li>明显属于临时调试或无复盘价值的原始日志</li></ul><p>如果相关信息对理解问题必要，应进行脱敏处理。</p><h2 id="输出要求" tabindex="-1">输出要求 <a class="header-anchor" href="#输出要求" aria-label="Permalink to &quot;输出要求&quot;">​</a></h2><p>使用 Markdown 输出。</p><p>语言使用中文。<br> 表达要简洁、准确、可复盘。<br> 不要使用夸张语气。<br> 不要添加没有依据的内容。<br> 无法确认的事项要明确标注“未确认”。</p><h2 id="输出结构" tabindex="-1">输出结构 <a class="header-anchor" href="#输出结构" aria-label="Permalink to &quot;输出结构&quot;">​</a></h2><p>请按以下结构生成每日记录：</p><div class="language-md vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 每日记录：YYYY-MM-DD</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 今日概览</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">用 2～4 句话总结今天主要和 GPT 讨论了什么，以及整体结果。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 主要主题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 1. 主题名称</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 背景：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 讨论内容：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 结论：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 后续影响：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 2. 主题名称</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 背景：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 讨论内容：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 结论：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 后续影响：</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 已完成事项</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 形成的规则或决策</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 待办事项</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [ ] </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 风险与注意事项</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 未确认事项</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 记录说明</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">本记录根据当天与 GPT 的对话内容整理，只保留具有复盘价值的主题、结论和待办。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><h2 id="生成规则" tabindex="-1">生成规则 <a class="header-anchor" href="#生成规则" aria-label="Permalink to &quot;生成规则&quot;">​</a></h2><p>如果当天内容较少，可以合并或省略空章节，但必须保留：</p><ul><li>今日概览</li><li>主要主题</li><li>已完成事项</li><li>待办事项</li></ul><p>如果当天没有可记录内容，输出：</p><div class="language-md vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 每日记录：YYYY-MM-DD</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 今日概览</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">今天没有形成需要记录的有效对话内容。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 主要主题</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">无。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 已完成事项</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">无。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 待办事项</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">无。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="质量检查" tabindex="-1">质量检查 <a class="header-anchor" href="#质量检查" aria-label="Permalink to &quot;质量检查&quot;">​</a></h2><p>生成前检查：</p><ul><li>是否只覆盖当天内容</li><li>是否去掉了无意义过程信息</li><li>是否保留了明确结论和待办</li><li>是否没有泄露敏感信息</li><li>是否没有编造未发生的事项</li><li>是否没有改写博客文章正文</li></ul>`,35)])])}const o=n(p,[["render",e]]);export{d as __pageData,o as default};
